class AddPantographToPersonalityProfile < ActiveRecord::Migration[5.1]
  def change
    add_column :personality_profiles, :pantograph, :string
  end
end
