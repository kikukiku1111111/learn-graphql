# Repository Guidelines

## プロジェクト構成

このリポジトリは `backend/` と `frontend/` の 2 つで構成されています。

- `backend/`: Rails API。GraphQL は `graphql-ruby` を使い、実装は `backend/app/graphql/` にあります。schema root は `backend/app/graphql/backend_schema.rb`、query は `types/query_type.rb`、mutation は `app/graphql/mutations/`、model は `backend/app/models/` です。
- `frontend/`: Next.js App Router + Apollo Client。画面と Apollo 利用コードは `frontend/app/`、静的ファイルは `frontend/public/` にあります。
- `backend/test/`: Rails のテストと fixture です。
- `.agents/skills/`: GraphQL、Apollo Client、schema/operation 用の project skills です。

## 開発・ビルド・テストコマンド

各コマンドは対象ディレクトリから実行してください。

Backend:

- `cd backend && bin/setup`: Rails アプリの初期セットアップ。
- `cd backend && bin/rails server`: Rails server を起動。
- `cd backend && bin/rails test`: Rails テストを実行。
- `cd backend && bin/rubocop`: Ruby の lint を実行。
- `cd backend && bin/brakeman`: Rails の security check を実行。

Frontend:

- `cd frontend && npm run dev`: Next.js dev server を起動。
- `cd frontend && npm run build`: frontend を build。
- `cd frontend && npm run lint`: ESLint を実行。

## コーディング規約

既存の Rails / Next.js の書き方に合わせてください。Ruby は 2 spaces indentation で、`rubocop-rails-omakase` を使います。GraphQL Ruby の class は path に合わせて `Types::*`、`Mutations::*` にします。TypeScript React では function component を使い、GraphQL data を扱う箇所では operation の型を明示してください。

frontend を変更する前に `frontend/AGENTS.md` を読んでください。この project は新しい Next.js を使っており、既存知識と異なる API や規約があります。

## テスト方針

backend の振る舞いを変える場合は `backend/test/` にテストを追加・更新してください。特に GraphQL mutation と model behavior はテスト対象です。frontend 変更では `npm run lint` と `npm run build` を確認します。GraphQL schema が Apollo operation に影響する場合は backend と frontend の両方を検証してください。

## コミット・PR 方針

履歴では `Add Apollo GraphQL skills` や `Apollo ClientのProviderを追加` のような短い命令形の summary が使われています。commit は目的ごとに小さくまとめてください。PR には変更概要、実行した検証コマンド、関連 issue、UI 変更がある場合は screenshot を含めてください。

## セキュリティと設定

password、password digest、token、credential などを GraphQL output type で公開しないでください。frontend の GraphQL endpoint は `NEXT_PUBLIC_GRAPHQL_ENDPOINT` を使います。public environment variable に secret を入れないでください。
