#!/bin/bash
set -e
export PGPASSWORD='localhost';
psql -v ON_ERROR_STOP=1 --username "blog" --dbname "blog_db" <<-EOSQL
  CREATE USER blog WITH PASSWORD 'localhost';
  CREATE DATABASE blog_db;
  GRANT ALL PRIVILEGES ON DATABASE blog_db TO blog;
  \connect blog_db blog
EOSQL
