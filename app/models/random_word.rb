class RandomWord
  def initialize
    @all = parse_words
  end

  attr_reader :all

  def gimme
    all.sample
  end

  private

  def parse_words
    file = File.read('lib/assets/words.json')
    data_hash = JSON.parse(file)
    data_hash['commonWords']
  end
end