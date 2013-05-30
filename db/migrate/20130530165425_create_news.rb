class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.string :titre
      t.string :contenu

      t.timestamps
    end
  end
end
