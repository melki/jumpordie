class PagesController < ApplicationController
  def home
  	@titre = "Home"
  end

  def game
  	@titre = "Game"
  end

  def score
  	@titre = "Score"
  	@pseudo = params[:pseudo]
  	@tries = params[:tries78]
  end
end
