import { Formik, Field, Form } from "formik"
import { useState } from "react"
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  console.log({ photos });
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            //llamar a api
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID BzoSHYSyqtNvn1CCAlcvzlWZbCg53H-jtIU-0vb7IqY'
              }
            })
            const data = await response.json()            
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search'>

            </Field>
          </Form>

        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description]}</p>
            </article>
          ))}
        </div>
      </div>

    </div>
  )
}

export default App
