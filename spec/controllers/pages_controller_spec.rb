require 'spec_helper'

describe PagesController do

  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end
  end

  describe "GET 'game'" do
    it "should be successful" do
      get 'game'
      response.should be_success
    end
  end

  describe "GET 'score'" do
    it "should be successful" do
      get 'score'
      response.should be_success
    end
  end

end
