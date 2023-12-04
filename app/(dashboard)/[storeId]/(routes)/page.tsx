import prismadb from "@/lib/prismadb"

type DashBoardPageProps = {
  params: { storeId: string }
}
const DashboardPage = async ({
  params
}: DashBoardPageProps
) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  return (
    <div>Active Store: {store?.name}</div>
  )
}

export default DashboardPage