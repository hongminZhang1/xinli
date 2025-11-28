#!/bin/bash

# 轻量应用云服务器部署脚本
# 使用方法: ./deploy.sh [server-ip] [server-user]

set -e

SERVER_IP=${1:-"193.112.165.180"}
SERVER_USER=${2:-"root"}
SERVER_DIR="/opt/xinli-api"

echo "开始部署到 $SERVER_USER@$SERVER_IP..."

# 1. 创建部署包
echo "创建部署包..."
tar -czf xinli-api-server.tar.gz server/

# 2. 上传到服务器
echo "上传文件到服务器..."
scp xinli-api-server.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

# 3. 在服务器上解压和安装
echo "在服务器上安装..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
    # 创建目录
    sudo mkdir -p /opt/xinli-api
    cd /opt/xinli-api
    
    # 解压文件
    sudo tar -xzf /tmp/xinli-api-server.tar.gz --strip-components=1
    
    # 安装依赖
    sudo npm install
    
    # 生成Prisma客户端
    sudo npx prisma generate
    
    # 设置权限
    sudo chmod +x *.js
    
    # 安装PM2（如果尚未安装）
    if ! command -v pm2 &> /dev/null; then
        sudo npm install -g pm2
    fi
    
    # 停止现有服务（如果存在）
    pm2 delete xinli-api 2>/dev/null || true
    
    # 启动新服务
    pm2 start api-server.js --name xinli-api
    
    # 保存PM2配置
    pm2 save
    pm2 startup
    
    # 清理临时文件
    rm /tmp/xinli-api-server.tar.gz
    
    echo "部署完成！"
    echo "API服务地址: http://$(curl -s ifconfig.me):3001"
    echo "健康检查: http://$(curl -s ifconfig.me):3001/health"
ENDSSH

# 4. 清理本地临时文件
rm xinli-api-server.tar.gz

# 5. 测试部署
echo "测试部署..."
sleep 5
curl -f http://$SERVER_IP:3001/health && echo "✓ API服务部署成功!" || echo "✗ API服务部署可能失败，请检查日志"

echo "部署脚本执行完成！"