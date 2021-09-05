const contentfulManagement = require("contentful-management")

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-U9W3QT86kftZkXrrWDRO2kJmTcOidK_d72d8hqZ6sYA',
  })

  return contentfulClient
    .getSpace('lwrn12tt4l7a')
    .then(space => space.getEnvironment('master'))
}