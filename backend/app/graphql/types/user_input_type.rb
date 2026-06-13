module Types
  class UserInputType < Types::BaseInputObject
    graphql_name "UserInputType"

    argument :id, ID, required: false
    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
  end
end
