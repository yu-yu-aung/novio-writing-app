export default async function Page({ params }) {
  const { keyWord } = await params;

  return (
    <>
      <p>This is the results for searching {keyWord} </p>
    </>
  );
}
