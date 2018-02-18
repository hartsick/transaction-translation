class PersonalityProfile < ApplicationRecord
  mount_uploader :pantograph, PantographUploader

  def to_param
    slug
  end
end
