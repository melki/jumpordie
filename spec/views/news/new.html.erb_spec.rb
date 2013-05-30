require 'spec_helper'

describe "news/new.html.erb" do
  before(:each) do
    assign(:new, stub_model(New,
      :titre => "MyString",
      :contenu => "MyString"
    ).as_new_record)
  end

  it "renders new new form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => news_path, :method => "post" do
      assert_select "input#new_titre", :name => "new[titre]"
      assert_select "input#new_contenu", :name => "new[contenu]"
    end
  end
end
