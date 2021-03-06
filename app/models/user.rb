class User < ApplicationRecord
    attr_reader :password
    validates :username, :session_token, :email, presence: true, uniqueness:true
    validates :password_digest, :account_type, presence: true
    validates :account_type, inclusion: ["student", "teacher"]
    validates :night_mode, inclusion: [true, false]
    validates :password, length: {minimum: 6, allow_nil: true}

    before_validation :ensure_session_token

    has_many :decks,
        foreign_key: :owner_id,
        class_name: :Deck,
        dependent: :destroy

    has_many :deck_studies,
        foreign_key: :studier_id,
        class_name: :DeckStudy,
        dependent: :destroy

    has_many :card_studies,
        foreign_key: :studier_id,
        class_name: :CardStudy,
        dependent: :destroy
    
    has_many :folders,
        foreign_key: :owner_id,
        class_name: :Folder

    has_many :decks_studied, through: :deck_studies, source: :deck

    def self.find_by_credentials(username, password)
        @user = User.find_by(username: username)
        @user && @user.is_password?(password) ? @user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end
end
