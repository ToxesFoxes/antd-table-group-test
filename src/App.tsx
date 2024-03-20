import './App.css'
import {  Table, TableColumnsType } from 'antd'
import { v4 } from 'uuid'

interface IRegion {
  uuid: string;
  name: string;
  code: string;
}

interface IClient {
  uuid: string;
  any_name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  state: 'working' | 'fired' | 'temporarily_not_working';
  comment: string;
  photo: string;
  gender: 'm' | 'f';
  region: IRegion;
}

const SomeClient1: IClient = {
  uuid: '1',
  any_name: '02 Иванов Иван Иванович',
  full_name: 'Иванов Иван Иванович',
  first_name: 'Иван',
  last_name: 'Иванов',
  middle_name: 'Иванович',
  state: 'working',
  comment: 'comment',
  photo: '123',
  gender: 'm',
  region: {
    uuid: 'ff0edb7f-dbdd-425a-ae68-78ae8fbeb3a9',
    name: 'г. Павлодар, Павлодарская область',
    code: '14'
  }
}

const SomeClient2: IClient = {
  uuid: 'f4914591-86cc-48e3-bbd3-058950e17d69',
  any_name: '02 Олегов Олег Олегович',
  full_name: 'Олегов Олег Олегович',
  first_name: 'Олег',
  last_name: 'Олегов',
  middle_name: 'Олегович',
  state: 'working',
  comment: 'comment',
  photo: '123',
  gender: 'm',
  region: {
    uuid: '809604a7-71b6-478c-9f43-41d0d97bafb1',
    name: 'Алматы',
    code: '02'
  }
}

const columns: TableColumnsType<IRegionGroup> = [
  { title: 'Регион', dataIndex: 'region.uuid', key: 'region.name', render: (_, regionGroup) => regionGroup.name },
  { title: 'Произвольное название', dataIndex: 'any_name', key: 'any_name', },
  { title: 'ФИО', dataIndex: 'full_name', key: 'full_name', },
  { title: 'Имя', dataIndex: 'first_name', key: 'first_name', },
  { title: 'Фамилия', dataIndex: 'last_name', key: 'last_name', },
  { title: 'Отчество', dataIndex: 'middle_name', key: 'middle_name', },
  { title: 'Статус', dataIndex: 'state', key: 'state', },
  { title: 'Комментарий', dataIndex: 'comment', key: 'comment', },
  { title: 'Пол', dataIndex: 'gender', key: 'gender' },
]
const regions: IRegion[] = [
  {
    uuid: '809604a7-71b6-478c-9f43-41d0d97bafb1',
    name: 'Алматы',
    code: '02'
  },
  {
    uuid: 'ff0edb7f-dbdd-425a-ae68-78ae8fbeb3a9',
    name: 'г. Павлодар, Павлодарская область',
    code: '14'
  }
]

const randomRegion = (): IRegion => {
  return regions[Math.floor(Math.random() * regions.length)]
}

const randomClient = (region: IRegion): IClient => {
  const newClient: any = {}
  Object.assign(newClient, Math.random() > 0.5 ? SomeClient1 : SomeClient2)
  newClient.uuid = v4()
  newClient.region = region
  return newClient
}

const clients: IClient[] = [
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
  randomClient(randomRegion()),
]

type IRegionGroup = IRegion & {
  children: IClient[]
}

const groupedByRegionClients: IRegionGroup[] = clients.reduce((acc, client) => {
  const region = acc.find(region => region.uuid === client.region.uuid)
  if (region) {
    region.children.push(client)
  } else {
    acc.push({
      ...client.region,
      children: [client]
    })
  }
  return acc
}, [] as IRegionGroup[])


function App() {
  console.log(groupedByRegionClients)
  return (
    <div className="App">
      <Table
        size="small"
        indentSize={0}
        // main key uuid
        rowKey="uuid"
        columns={columns}
        dataSource={groupedByRegionClients}
      />
    </div>
  )
}

export default App
