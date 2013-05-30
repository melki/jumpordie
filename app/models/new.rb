class New < ActiveRecord::Base
  attr_accessible :contenu, :titre
   	validates :contenu, :presence => true, :uniqueness => true
   	validates :titre, :presence => true
   	
end
