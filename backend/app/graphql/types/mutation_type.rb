# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_user, resolver: Mutations::CreateUser
    field :update_user, Types::UserType, mutation: Mutations::UpdateUser
    field :destroy_user, GraphQL::Types::Boolean, mutation: Mutations::DestroyUser
  end
end
