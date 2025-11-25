#!/bin/bash
# backup-current-data.sh
# 备份当前Neon数据库的数据

echo "开始备份当前数据库..."

# 设置Neon数据库连接信息
NEON_HOST="ep-summer-feather-ahslz36h.c-3.us-east-1.aws.neon.tech"
NEON_USER="neondb_owner"
NEON_PASSWORD="npg_1b2CWazMxAuH"
NEON_DB="neondb"

# 备份文件名（带时间戳）
BACKUP_FILE="xinli_backup_$(date +%Y%m%d_%H%M%S).sql"

echo "导出数据到文件: $BACKUP_FILE"

# 导出数据库结构和数据
PGPASSWORD=$NEON_PASSWORD pg_dump \
  -h $NEON_HOST \
  -U $NEON_USER \
  -d $NEON_DB \
  --no-owner \
  --no-privileges \
  --clean \
  --if-exists \
  > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "备份成功！文件：$BACKUP_FILE"
    echo "文件大小：$(du -h $BACKUP_FILE | cut -f1)"
else
    echo "备份失败！"
    exit 1
fi

echo "备份完成！"