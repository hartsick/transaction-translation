class CreatePersonalityProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :personality_profiles do |t|
      t.string :slug
      t.hstore :url_params
      t.timestamps
    end
  end
end
