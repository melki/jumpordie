class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :pseudo
      t.integer :tries
      t.datetime :date

      t.timestamps
    end
  end
end
