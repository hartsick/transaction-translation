class PersonalityRequestController < ApplicationController
  def new
    @personality_profile = PersonalityProfile.new
  end

  def create
    profile = PersonalityProfile.new(profile_params)
    profile.url_params = generate_url_params
    profile.slug = generate_unique_slug

    if profile.valid?
      profile.save
      redirect_to personality_request_path(profile)
    else
      render :new
    end
  end

  def show
    @personality_profile = PersonalityProfile.find_by_slug(params[:slug])
  end

  private

  def profile_params
    params.require(:personality_profile).permit(:slug, {pantograph: []})
  end

  def generate_url_params
    {
      "Assertive": rand,
      "Intelligent": rand,
      "Excitement Seeker": rand,
      "Sympathetic": rand,
      "Trustworthy": rand,
      "Cautious": rand,
      "Self-Conscious": rand,
      "Emotional": rand,
    }
  end

  def generate_unique_slug
    @word_generator ||= RandomWord.new
    (@word_generator.all - PersonalityProfile.pluck(:slug)).sample
  end
end
