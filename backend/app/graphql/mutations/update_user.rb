class Mutations::UpdateUser < GraphQL::Schema::Mutation
  argument :user, Types::UserInputType, required: true

  def resolve(user:)
    target_user = User.find(user.id)
    target_user.update!(user.to_h)
    target_user
  end
end
