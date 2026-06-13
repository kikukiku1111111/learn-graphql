"use client";

import { gql } from "@apollo/client";
import type { TypedDocumentNode } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

type User = {
  id: string;
  name: string | null;
  email: string | null;
};

type UsersQueryData = {
  users: User[];
};

type CreateUserMutationData = {
  createUser: User;
};

type CreateUserMutationVariables = {
  user: {
    name: string;
    email: string;
    password: string;
  };
};

const USERS_QUERY: TypedDocumentNode<UsersQueryData> = gql`
  query Users {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_USER_MUTATION: TypedDocumentNode<
  CreateUserMutationData,
  CreateUserMutationVariables
> = gql`
  mutation CreateUser($user: UserInputType!) {
    createUser(user: $user) {
      id
      name
      email
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(USERS_QUERY);
  const [createUser, { loading: creating, error: createError }] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [{ query: USERS_QUERY }],
  });

  const handleCreateUser = async () => {
    const suffix = Date.now();

    await createUser({
      variables: {
        user: {
          name: `user-${suffix}`,
          email: `user-${suffix}@example.com`,
          password: "password",
        },
      },
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Apollo Client Demo</h1>
        <p className="text-sm text-zinc-600">
          Rails GraphQL の users query と createUser mutation を Apollo Client
          から呼び出します。
        </p>
      </header>

      <section className="space-y-4">
        <button
          className="w-fit rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={creating}
          onClick={handleCreateUser}
          type="button"
        >
          {creating ? "作成中..." : "Userを作成"}
        </button>

        {createError ? (
          <p className="text-sm text-red-600">{createError.message}</p>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Users</h2>

        {loading ? <p className="text-sm text-zinc-600">読み込み中...</p> : null}
        {error ? <p className="text-sm text-red-600">{error.message}</p> : null}

        <ul className="divide-y divide-zinc-200 rounded-md border border-zinc-200">
          {data?.users.map((user) => (
            <li className="flex items-center justify-between gap-4 p-4" key={user.id}>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-zinc-600">{user.email}</p>
              </div>
              <span className="text-xs text-zinc-500">ID: {user.id}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
