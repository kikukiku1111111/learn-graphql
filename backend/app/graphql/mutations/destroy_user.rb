class Mutations::DestroyUser < GraphQL::Schema::Mutation
  argument :id, ID, required: true

  def resolve(id:)
    target_user = User.find(id)
    target_user.destroy

    target_user.destroyed?
  end
end
