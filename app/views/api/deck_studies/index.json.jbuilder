@deck_studies.each do |deck_study|
    json.set! deck_study.id do
        json.partial! 'api/deck_studies/deck_study', deck_study: deck_study
    end
end