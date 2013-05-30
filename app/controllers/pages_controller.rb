class PagesController < ApplicationController
  def home
  	@titre = "Home"
  end

  def game
    @titre = "Game"
  end

  def ajout
  	@titre = "Ajout"
    @pass = params[:pass]
    @title = params[:titre]
    @contenu = params[:contenu]
  end

  def score
  	@titre = "Score"
  	@pseudo = params[:pseudo]
  	@tries = params[:tries78]
  end
end
