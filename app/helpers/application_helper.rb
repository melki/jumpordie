module ApplicationHelper
  # Retourner un titre basé sur la page.
  def titre
    base_titre = "Melki"
    if @titre.nil?
      base_titre
    else
      "#{base_titre} | #{@titre}"
    end
  end

  def active(page)
  	if(@titre==page)
  		'class=active'
  	end
  end
end
