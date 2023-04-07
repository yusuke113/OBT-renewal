# OBTサイトリニューアル

## 開発するには

### アプリケーションの起動

以下のコマンドを実行してアプリケーションを起動します。

1. ホストPC上でdockerが起動していることを確認
2. 下記コマンドを実行

- プロジェクトを作成したいフォルダ内で(SSH)
```bash
git clone git@github.com:yusuke113/OBT-renewal.git && cd OBT-renewal && make init
```

3. ターミナルでmake 下記コマンドを実行し、コンテナのステータスが全てUPになっていることを確認

```bash
make ps
```

- ブラウザ表示 http://localhost:3000/
