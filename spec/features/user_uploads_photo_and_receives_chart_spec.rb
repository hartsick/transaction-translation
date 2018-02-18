require 'rails_helper'

describe 'generating a personality profile', :type => :feature do
  it 'accepts a photo upload and generates a personality profile' do
    visit root_path

    expect(page).to have_content('Upload your pantograph here.')

    attach_file('personality_profile[pantograph]', Rails.root + 'spec/fixtures/test.jpg')

    click_on 'Upload'

    expect(page).to have_content('Your personality profile is ready.')
  end
end

describe 'revisiting a personality profile', :type => :feature  do
  before do
    PersonalityProfile.create(slug: 'anniedog', url_params: {
      'Assertive': 0.345,
      'Intelligent': 0.345,
      'Excitement Seeker': 1,
      'Sympathetic': 0.345,
      'Trustworthy': 0.345,
      'Cautious': 0.345,
      'Self-Conscious': 0.345,
      'Emotional': 0.345,
    })
  end

  it 'accepts a photo upload and generates a personality profile', js: true do
    visit personality_profile_path(slug: 'anniedog')

    expect(page).to have_content('You are an excitement seeker.')
    expect(page).to have_content('To view it, head over to')
    expect(page).to have_content('/anniedog')
  end
end