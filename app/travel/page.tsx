// make use of the Google maps embed api to show location
// https://developers.google.com/maps/documentation/embed/get-api-key



type Props = {}
const enableMap = false
export default function Location({}: Props) {
  return (
    <div>

    <div>Location</div>
   { enableMap ?<iframe width="600" height="450" style={{border:0}} loading="lazy" allowFullScreen
src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJYdLhV4zMcmsR0NwyFmh9AQU&key=${process.env.GOOGLE_EMBED_APIKEY}`}></iframe>:null}
</div>
  )
}