MAKEFILE_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

help:
	@echo "\033[1;34m---------- Dockerに関するコマンド ----------\033[0m"
	@echo 'ps                     -- コンテナ一覧を表示します'
	@echo 'build                  -- 全コンテナイメージをビルドします'
	@echo 'up                     -- 全コンテナを作成後、コンテナを起動します'
	@echo 'up-prod                -- 本番モードで全コンテナを作成後、コンテナを起動します'
	@echo 'down                   -- 全コンテナを削除します'
	@echo 'restart                -- 全コンテナを作り直した後起動します ※image、volumeは既存のものを再利用'
	@echo 'destroy                -- コンテナ、ネットワーク、イメージ、ボリュームを削除します'
	@echo ''
	@echo "\033[1;34m---------- appコンテナに関するコマンド ----------\033[0m"
	@echo 'app                    -- appコンテナに接続します'
	@echo 'npm-install            -- appコンテナで依存モジュール群をインストールします'
	@echo ''
	@echo '---------- Gitに関するコマンド ----------'
	@echo 'gs                     -- Gitステータスを確認'
	@echo 'gl                     -- Gitコミットログを確認'
	@echo 'gl-ol                  -- Gitコミットログをワンラインで確認'
	@echo '---------- 便利ツールに関するコマンド ----------'
	@echo 'open                   -- ブラウザで開発環境のページをブラウザで開く'
	@echo 'open-prod              -- ブラウザで本番環境のページをブラウザで開く'

#
# Dockerに関するコマンド
# ----------------------------------------------
init:
	@echo "\033[1;32mDocker環境のセットアップ中...\033[0m"
	@make build
	docker-compose run --rm app npm i
	@make up
remake:
	@echo "\033[1;32mDocker環境削除中...\033[0m"
	@make destroy
	@echo "\033[1;32mDocker環境のセットアップ中...\033[0m"
	@make build
	docker-compose run --rm app npm i
	@make up
ps:
	docker ps -a
build:
	docker-compose build --no-cache --force-rm
up:
	docker-compose up -d
up-prod:
	docker-compose -f docker-compose.prod.yml build --no-cache --force-rm
	docker-compose -f docker-compose.prod.yml up -d
down:
	docker-compose down
restart:
	docker-compose down
	docker-compose up -d
destroy:
	docker-compose down --rmi all --volumes --remove-orphans

#
# appコンテナに関するコマンド
# ----------------------------------------------
app:
	docker-compose run --rm app bash
npm-install:
	docker-compose exec app npm i
next-build:
	docker-compose exec app npm run build
next-export:
	docker-compose exec app npm run export

#
# Gitに関するコマンド
# ----------------------------------------------
gs:
	git status
gl:
	git log
glo:
	git log --oneline

#
# ブラウザに関するコマンド
# ----------------------------------------------
open:
	open http://localhost:3000
open-prod:
	open http://localhost:4000