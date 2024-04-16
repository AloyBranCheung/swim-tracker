resource "auth0_user" "user" {
  connection_name = "Username-Password-Authentication"
  name            = var.test_user_email
  nickname        = "test"
  email           = var.test_user_email
  picture         = "https://www.nbc.com/sites/nbcblog/files/2022/07/the-office-how-to-watch.jpg"
  # cannot update simultaneously
  password        = var.test_user_pass
  email_verified  = true
}