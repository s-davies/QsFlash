# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_08_091720) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "card_studies", force: :cascade do |t|
    t.boolean "starred", null: false
    t.integer "correctness_count", null: false
    t.integer "learn_count", null: false
    t.integer "write_count", null: false
    t.integer "spell_count", null: false
    t.integer "test_count", null: false
    t.integer "card_id", null: false
    t.integer "studier_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id", "studier_id"], name: "index_card_studies_on_card_id_and_studier_id", unique: true
  end

  create_table "cards", force: :cascade do |t|
    t.integer "order", null: false
    t.integer "deck_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "term"
    t.string "definition"
    t.index ["deck_id"], name: "index_cards_on_deck_id"
  end

  create_table "deck_studies", force: :cascade do |t|
    t.integer "progress", null: false
    t.integer "deck_id", null: false
    t.integer "studier_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rating"
    t.index ["deck_id", "studier_id"], name: "index_deck_studies_on_deck_id_and_studier_id", unique: true
  end

  create_table "decks", force: :cascade do |t|
    t.string "title", null: false
    t.string "visibility", null: false
    t.string "editability", null: false
    t.string "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.integer "card_count", null: false
    t.index ["owner_id"], name: "index_decks_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "account_type", null: false
    t.string "status_level"
    t.boolean "night_mode", null: false
    t.integer "school_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
