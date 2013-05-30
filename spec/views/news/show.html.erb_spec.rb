require 'spec_helper'

describe "news/show.html.erb" do
  before(:each) do
    @new = assign(:new, stub_model(New,
      :titre => "Titre",
      :contenu => "Contenu"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Titre/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Contenu/)
  end
end
