class PersonalityProfileController < ApplicationController
  def show
    @personality_profile = PersonalityProfile.find_by_slug(params[:slug])
  end
end
