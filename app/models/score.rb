
class Validation < ActiveModel::Validator
  def validate(record)
    if Score.exists?(:pseudo => record.pseudo) 
    	if  Score.where({ :pseudo => record.pseudo }).last.tries == record.tries 
      		record.errors[:base] << "This person is already there !"
    	end	
    end
  end
end

class Score < ActiveRecord::Base
	attr_accessible :date, :pseudo, :tries

   	validates :pseudo, :presence => true,
   						:length   => { :maximum => 50 }

   	validates :tries, :presence => true,:numericality => { :only_integer => true }
   	validates_with Validation
end
