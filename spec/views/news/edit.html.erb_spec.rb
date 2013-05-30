require 'spec_helper'

describe "news/edit.html.erb" do
  before(:each) do
    @new = assign(:new, stub_model(New,
      :titre => "MyString",
      :contenu => "MyString"
    ))
  end

  it "renders the edit new form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => news_path(@new), :method => "post" do
      assert_select "input#new_titre", :name => "new[titre]"
      assert_select "input#new_contenu", :name => "new[contenu]"
    end
  end
end
