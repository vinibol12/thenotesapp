class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable, :omniauth_providers => [:facebook]


  # def self.from_omniauth(hash)
  #
  #   where(provider: hash.provider, uid: hash.uid).first_or_create do |user|
  #     user.email = hash.info.email
  #     user.password = Devise.friendly_token[0,20]
  #     user.username = hash.info.name
  #       # assuming the user model has a name
  #     # user.provider = hash.info.provider
  #     # user.uid = hash.info.uid
  #   end
  # end


  def self.from_omniauth(hash)
    find_by_provider_and_uid(hash.provider, hash.uid) || find_by_omni_email(hash) || create_with_omniauth(hash)
  end

  def self.create_with_omniauth(hash)
    u = User.new
    u.provider = hash.provider
    u.uid = hash.uid
    u.email = hash.info.email
    u.password = Devise.friendly_token[0,20]
    u.username = hash.info.name
    u.save
    u
  end

  def self.find_by_omni_email(hash)
    u = User.where(email: hash.info.email).first
    return nil if u.blank?
    u.provider = hash.provider
    u.uid = hash.uid
    u.save
    u
  end

  def self.find_by_provider_and_uid(provider, uid)
    User.where(provider: provider, uid: uid).first
  end
end

