class PagesController < ApplicationController
  def home
  	@titre = "Home"
  end

  def game
  	@titre = "Game"
  end

  def score
  	@titre = "Score"
  end
end
