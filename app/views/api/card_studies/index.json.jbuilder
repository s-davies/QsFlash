@card_studies.each do |card_study|
    json.set! card_study.id do
        json.partial! 'api/card_studies/card_study', card_study: card_study
    end
end