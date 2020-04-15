@folder_decks.each do |folder_deck|
    json.set! folder_deck.id do
        json.partial! 'api/folder_decks/folder_deck', folder_deck: folder_deck
    end
end