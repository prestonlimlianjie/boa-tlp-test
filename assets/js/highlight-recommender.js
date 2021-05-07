function getUri(){
  let experimentId = 'boa-test'
  let userId = document.cookie
  .split('; ')
  .find(row => row.startsWith('_ga'))
  .split('=')[1];
  let apiBaseUrl = "https://4zcksddi64.execute-api.ap-southeast-1.amazonaws.com/beta/highlight-recommender-staging"
  return `${apiBaseUrl}?userId=${userId}&experimentId=${experimentId}`
}

axios.get(getUri())
.then(function (response) {
  const keyHighlightsContainer = document.getElementById('key-highlights')
  let innerHtmlString = '<div class="bp-container"><div class="row is-gapless has-text-centered">'
  
  const experimentId = response.data.experiment_id
  const treatmentId = response.data.treatment_id
  response.data.recommended_highlights.forEach(function (highlight) {
    const { title, url, description } = highlight
    innerHtmlString += `<div class="col"><a href="${url}?utm_source=${experimentId}&utm_medium=${treatmentId}" class="is-highlight"><div class="key-highlights-text"><p class="has-text-weight-semibold has-text-white key-highlight-title is-uppercase padding--top--xs">${title}</p></div></a></div><p class="has-text-white-trans padding--bottom--sm">${description}</p>`
  })
  
  innerHtmlString += '</div></div>'
  
  keyHighlightsContainer.innerHTML = innerHtmlString
})
.catch(function (error) {
  console.log(error);
})
