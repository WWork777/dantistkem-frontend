import Contacts from '@/components/main-page/Contacts/Contacts'
import Link from 'next/link'
import React from 'react'
import styles from './prices.module.scss'

interface Props {
	className?: string
}

const PricesPage: React.FC<Props> = ({ className }) => {
	const prices = {
		list1: {
			spec: 'Прием ортодонта',
			common: {
				title: '1. ОБЩИЕ УСЛУГИ',
				serv: [
					{
						title:
							'Первичный прием (осмотр, опрос, консультация, документация)',
						code: 'в01.063.001',
						price: '1200',
					},
					{
						title:
							'Повторный прием (осмотр, контроль гигиены и лечения, беседа)',
						code: 'в01.063.002',
						price: '500',
					},
				],
			},
			ortodont: {
				title: '2. ОРТОДОНТИЧЕСКИЕ УСЛУГИ',
				serv: [
					{
						title: 'Миогимнастика (назначение комплекса упражнений, обучение)',
						code: 'а01.07.007',
						price: '500',
					},
					{
						title: 'Контроль за проведением миогимнастики',
						code: 'а01.07.001',
						price: '300',
					},
					{
						title: 'Гигиенический уход (профессиональная чистка зубов)',
						code: 'а01.07.001.001',
						price: '700',
					},
					{
						title: 'Контроль гигиены полости рта',
						code: 'а01.07.007',
						price: '500',
					},
					{
						title: 'Снятие 1-го слепка, отливка 1-ой модели',
						code: 'а02.07.010.001',
						price: '900',
					},
					{
						title: 'Отливка модели по снятому слепку',
						code: 'а23.07.002.027',
						price: '800',
					},
					{
						title: 'Коррекция съемного ортодонтического аппарата',
						code: 'а23.07.001.001',
						price: '600',
					},
					{
						title:
							'Активация съемного ортодонтического аппарата(1-го элемента)',
						code: 'а16.07.028',
						price: '700',
					},
					{
						title: 'Починка съемного ортодонтического аппарата',
						code: 'а23.07.001.002',
						price: '3950',
					},
					{
						title:
							'Клиническая реконструкция съемного ортодонтического аппарата самоответждаемой пластмассой',
						code: 'а23.07.002.037',
						price: '3250',
					},
					{
						title: 'Окклюдограмма',
						code: 'а02.07.006',
						price: '350',
					},
					{
						title:
							'Измерение, диагностика модели по методам: Gerlach, Pont, Korkhaus, Schwars, Снагиной, прогноз размеров постоянных зубов по методу Королевой.',
						code: 'а02.07.004',
						price: '2500',
					},
					{
						title:
							'Физиолог. Сепарац. зубов пров. лигатурой или эласт. сепараторами.',
						code: 'а16.07.025.002',
						price: '150',
					},
					{
						title: 'Сепарация (сошлифовка тканей зуба)',
						code: 'а16.07.082',
						price: '350',
					},
					{
						title: 'Пришлифовка бугров зуба',
						code: 'а16.07.025',
						price: '350',
					},
					{
						title: 'Приклеивание 1-го брекета на светоотверждаемый композит',
						code: 'а16.07.028',
						price: '850',
					},
					{
						title: 'Снятие 1-го брекета (световой композит)',
						code: 'а16.07.028',
						price: '550',
					},
					{
						title: 'Наложение проволочной или эластичной лигатуры (1 зуб)',
						code: 'а23.07.001',
						price: '250',
					},
					{
						title: 'Наложение межчелюстной тяги',
						code: 'а23.07.001',
						price: '250',
					},
					{
						title: 'Фиксация, снятие кольца',
						code: 'а16.07.053.001',
						price: '300',
					},
					{
						title: 'Припасовка дуги NiTi (0.14; 0.16; 0.18; 0.16*0,22)',
						code: 'а23.07.001',
						price: '1200',
					},
					{
						title: 'Припасовка дуги MTA',
						code: 'а23.07.001',
						price: '1200',
					},
					{
						title: 'Припасовка дуги реверсионной',
						code: 'а23.07.001',
						price: '1200',
					},
					{
						title: 'Припасовка дуг RESPOND, TRIPLEX',
						code: 'а23.07.001',
						price: '1200',
					},
				],
			},
			apparat: {
				title: '3 АППАРАТУРА',
				serv: [
					{
						title: 'Пластинка съемная расширяющая',
						code: 'а16.07.028',
						price: '9800',
					},
					{
						title: 'Пластинка съемная расширяющая с 3-х мерным винтом',
						code: 'а16.08.028.01',
						price: '12800',
					},
					{
						title: 'Винт дополнительный к пластинке',
						code: 'а16.08.028.03',
						price: '1000',
					},
					{
						title: 'L-M-активатор',
						code: 'а16.07.028.02',
						price: '11000',
					},
					{
						title: 'Вестибулярная пластинка',
						code: 'а23.07.022.065',
						price: '5000',
					},
					{
						title: 'Ортодонтическая коронка с замком',
						code: 'а23.07.002.055',
						price: '3500',
					},
					{
						title: 'Брекеты',
						code: 'а16.07.028',
						price: '62900',
					},
					{
						title: 'Брекет-система частичная',
						code: 'а16.07.028.01',
						price: '31450',
					},
					{
						title: 'Бюгель нёбный',
						code: 'а16.07.028.02',
						price: '33000',
					},
					{
						title: 'Мягкая капа',
						code: 'а23.07.002.065',
						price: '3000',
					},
					{
						title: 'Жесткая капа',
						code: 'а23.07.002.065',
						price: '6000',
					},
				],
			},
		},
		list2: {
			spec: 'Прием терапевта',
			serv: [
				{
					title: 'Инфильтрационная анестезия',
					code: 'В01.003.004.005',
					price: '600',
				},
				{
					title: 'Торусальная анестезия',
					code: 'В01.003.004.006',
					price: '800',
				},
				{
					title: 'Временная пломба',
					code: 'А16.07.002.009',
					price: '500',
				},
				{
					title:
						'Профессиональная гигиена полости рта (1зуб-100руб). Пьезон + Air-flow',
					code: 'А16.07.051.001',
					price: '4500',
				},
				{
					title:
						'Ультрозвуковое удаление зубных отложений. Профессиональная гигиена полости рта (1зуб-120руб)',
					code: 'А22.07.002',
					price: '3000',
				},
				{
					title: 'Зубные украшения (Скайс)',
					code: 'А16.07.030.027',
					price: '1500',
				},
				{
					title: 'Отбеливание 1одного зуба',
					code: 'А16.07.050',
					price: '2000',
				},
				{
					title: 'Глубокое фторирование (1 зуб)',
					code: 'А11.07.012',
					price: '200',
				},
				{
					title: 'Восстановление зуба стекловолоконным штифтом',
					code: 'А16.07.031.003',
					price: '5000',
				},
				{
					title: 'Восстановление зуба анк.штифтом под коронку',
					code: 'А16.07.031.001',
					price: '4000',
				},
				{
					title: 'Восстановление зуба с анкерным штифтом',
					code: 'А16.07.031',
					price: '4500',
				},
				{
					title: 'Серебрение одного зуба',
					code: 'А11.07.023',
					price: '200',
				},
				{
					title: 'Эстетическая реставрация',
					code: 'А16.07.004',
					price: '5500',
				},
				{
					title: 'Ars + Повязка, Р-Ф.+Повязка',
					code: 'А11.07.027',
					price: '700',
				},
				{
					title: 'R-графия',
					code: 'А06.07.003',
					price: '400',
				},
				{
					title: 'Микропротезир-е',
					code: 'А16.07.031.003',
					price: '8000',
				},
				{
					title: 'Пломба Vitremer',
					code: 'А16.07.002.017',
					price: '4500',
				},
				{
					title: 'Изолирующая прокладка',
					code: 'А16.07.002.005',
					price: '1200',
				},
				{
					title: 'Изолирующая прокладка Витример',
					code: 'А16.07.002.006',
					price: '3000',
				},
				{
					title: 'Valux, Праймдент, Призмафил',
					code: 'А16.07.002.010',
					price: '2700',
				},
				{
					title: 'Dynamic, DiaFil',
					code: 'А16.07.002.011',
					price: '3000',
				},
				{
					title: 'Charisma, Filtek z250, GradiaDirect, Beautifil, Palfique',
					code: 'А16.07.002.012',
					price: '3500',
				},
				{
					title: 'Filtek z550, Estelite∑Quick',
					code: 'А16.07.002.013',
					price: '4000',
				},
				{
					title: '1-х канал. зуба (прох/труднопрох)',
					code: 'А16.07.008',
					price: '3000, 4000',
				},
				{
					title: '2-х канал. зуба (прох/труднопрох)',
					code: 'А16.07.008.001',
					price: '3500, 4500',
				},
				{
					title: '3-х канал. зуба (прох/труднопрох)',
					code: 'А16.07.008.002',
					price: '4500, 5500',
				},
				{
					title: '4-х канал. зуба (прох/труднопрох)',
					code: 'А16.07.008.003',
					price: '5000, 6000',
				},
				{
					title: '«Calasept» Вр.пломб-е корн. канала',
					code: 'А16.07.030.002',
					price: '1200',
				},
				{
					title: 'Распломбирование одного корневого канала',
					code: 'А16.07.082.001',
					price: '1800',
				},
				{
					title: 'Операция удаления одного зуба',
					code: 'А16.07.001',
					price: '3000',
				},
				{
					title: 'Операция удаления одного осложненного зуба',
					code: 'А16.07.002',
					price: '4500',
				},
				{
					title: 'Десенситайзер (1 зуб)',
					code: 'А11.07.012',
					price: '500',
				},
			],
		},
		list3: {
			spec: 'Прием ортопеда',
			common: {
				title: 'ОБЩИЕ УСЛУГИ',
				serv: [
					{
						title: 'Анестезия проводниковая, инфильтрационная импортная',
						code: 'в01.003.004.005',
						price: '500',
					},
					{
						title: 'Снятие или цементировка старой коронки',
						code: 'а16.07.053',
						price: '500',
					},
					{
						title: 'Снятие металлокерамической коронки',
						code: 'а16.07.053',
						price: '700',
					},
					{
						title: 'Фиксация на vip-цемент (1 зуб)',
						code: 'а16.07.049.001',
						price: '800',
					},
					{
						title: 'Индивидуальная ложка',
						code: 'а02.07.010.001',
						price: '1500',
					},
				],
			},
			fixed: {
				title: 'НЕСЪЁМНЫЕ ПРОТЕЗЫ',
				serv: [
					{
						title: 'Коронка штампованная восстановительная из стали',
						code: 'а16.07.004.001',
						price: '4000',
					},
					{
						title: 'Коронка цельнолитая',
						code: 'а16.07.004.003',
						price: '8000',
					},
					{
						title: 'Коронка титановая',
						code: 'а16.07.004.005',
						price: '8000',
					},
					{
						title: 'Коронка пластмассовая',
						code: 'а16.07.004.003',
						price: '4000',
					},
					{
						title: 'Зуб литой из КХС в цельнолитом мостовидном протезе',
						code: 'а16.07.004.002',
						price: '6000',
					},
					{
						title: 'Зуб литой из стали',
						code: 'а16.07.005.001',
						price: '6000',
					},
					{
						title: 'Коронка цельнолитая на импланте',
						code: 'а16.07.004.004',
						price: '16000',
					},
					{
						title: 'Зуб штифтовый с литой культёй',
						code: 'а16.07.033.001',
						price: '5000',
					},
					{
						title: 'Замена или установка кламмера',
						code: 'а23.07.002.035',
						price: '1000',
					},
					{
						title: 'Установка дополнительного зуба',
						code: 'а23.07.002.036',
						price: '1000',
					},
					{
						title: 'Керамическая коронка или зуба',
						code: 'а16.07.004.004',
						price: '12000',
					},
					{
						title: 'Изготовление временной пластмассовой коронки',
						code: 'а16.07.004.001',
						price: '1500',
					},
				],
			},
			removable: {
				title: 'СЪЁМНЫЕ ПРОТЕЗЫ',
				serv: [
					{
						title: 'Изготовление Частичного съёмного протеза',
						code: 'а16.07.035',
						price: '25000',
					},
					{
						title: 'Изготовление Частичного съёмного протеза (Премиум)',
						code: 'а.16.07.035.1',
						price: '30000',
					},
					{
						title: 'Изготовление Полного съёмного протеза',
						code: 'а16.07.023.001',
						price: '27000',
					},
					{
						title: 'Изготовление Полного съёмного протеза (Премиум)',
						code: 'а16.07.023.002',
						price: '32000',
					},
					{
						title: 'Изготовление нейлонового протеза',
						code: 'а16.07.035.001',
						price: '30000',
					},
					{
						title: 'Изготовление нейлоновой косметической пластинки',
						code: 'а16.07.035.002',
						price: '16000',
					},
					{
						title: 'Изготовление бюгельного протеза',
						code: 'а16.07.036.001',
						price: '42000',
					},
					{
						title: 'Изготовление бюгельного протеза с замковой фиксацией',
						code: 'а16.07.036.002',
						price: '45000',
					},
					{
						title: 'Армировка акрилового протеза',
						code: 'а16.07.023.002',
						price: '3000',
					},
					{
						title: 'Косметическая пластинка (акрил)',
						code: 'а16.07.035.002',
						price: '15000',
					},
					{
						title: 'Снятие оттиска с одной челюсти (альгинат)',
						code: 'а02.07.010.001',
						price: '500',
					},
					{
						title: 'Снятие оттиска с одной челюсти (силикон)',
						code: 'а02.07.010.001',
						price: '1000',
					},
					{
						title: 'Опред. степени откр-я рта опр-е подвижн. н.ч. диагн. мод.',
						code: 'а01.07.007',
						price: '300',
					},
					{
						title: 'Опред. прикуса, регистрация',
						code: 'а02.07.006',
						price: '200',
					},
					{
						title: 'Починка нейлонового протеза',
						code: 'а23.07.002.036',
						price: '4500',
					},
					{
						title: 'Починка акрилового протеза',
						code: 'а23.07.002.035',
						price: '2000',
					},
					{
						title: 'Коронка диоксид циркония',
						code: 'а16.07.004.006',
						price: '15000',
					},
					{
						title: 'Коронка диоксид циркония с нанесением керамики',
						code: 'а16.07.004.007',
						price: '16000',
					},
					{
						title: 'Коронка металлокерамическая на импланте',
						code: 'а16.07.004.008',
						price: '27000',
					},
				],
			},
		},
	}

	return (
		<section className={`${styles.container} ${className || ''}`}>
			{/* Хлебные крошки */}
			<nav className={styles.breadcrumbs} aria-label='Хлебные крошки'>
				<div className={styles.breadcrumbItem}>
					<Link href='/' className={styles.link}>
						<span>Главная</span>
					</Link>
					<span className={styles.separator}>/</span>
				</div>
				<div className={styles.breadcrumbItem}>
					<span className={styles.currentPage} aria-current='page'>
						Цены
					</span>
				</div>
			</nav>

			<h1 className={styles.title}>Цены на услуги</h1>

			{/* Блок цен */}
			<section className={styles.prices_container}>
				{/* ОРТОДОНТИЯ */}
				<div className={styles.section}>
					<h2 className={styles.section_title}>Ортодонтия</h2>
					<div className={styles.table_wrapper}>
						{/* Общие услуги */}
						<h3 className={styles.subsection_title}>
							{prices.list1.common.title}
						</h3>
						<table className={styles.prices_table}>
							<thead>
								<tr className={styles.header_row}>
									<th className={styles.header_cell}>Наименование услуги</th>
									<th className={styles.header_cell_price}>Цена</th>
								</tr>
							</thead>
							<tbody>
								{prices.list1.common.serv.map((service, index) => (
									<tr
										key={`ortho-common-${index}`}
										className={styles.table_row}
									>
										<td className={styles.table_cell}>
											<div className={styles.service_name}>{service.title}</div>
											<div className={styles.service_description}>
												Код: {service.code}
											</div>
										</td>
										<td className={styles.table_cell_price}>
											{Number(service.price).toLocaleString()} ₽
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{/* Ортодонтические услуги */}
						<h3 className={styles.subsection_title}>
							{prices.list1.ortodont.title}
						</h3>
						<table className={styles.prices_table}>
							<thead>
								<tr className={styles.header_row}>
									<th className={styles.header_cell}>Наименование услуги</th>
									<th className={styles.header_cell_price}>Цена</th>
								</tr>
							</thead>
							<tbody>
								{prices.list1.ortodont.serv.map((service, index) => (
									<tr
										key={`ortho-ortodont-${index}`}
										className={styles.table_row}
									>
										<td className={styles.table_cell}>
											<div className={styles.service_name}>{service.title}</div>
											<div className={styles.service_description}>
												Код: {service.code}
											</div>
										</td>
										<td className={styles.table_cell_price}>
											{Number(service.price).toLocaleString()} ₽
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{/* Аппаратура */}
						<h3 className={styles.subsection_title}>
							{prices.list1.apparat.title}
						</h3>
						<table className={styles.prices_table}>
							<thead>
								<tr className={styles.header_row}>
									<th className={styles.header_cell}>Наименование услуги</th>
									<th className={styles.header_cell_price}>Цена</th>
								</tr>
							</thead>
							<tbody>
								{prices.list1.apparat.serv.map((service, index) => (
									<tr
										key={`ortho-apparat-${index}`}
										className={styles.table_row}
									>
										<td className={styles.table_cell}>
											<div className={styles.service_name}>{service.title}</div>
											<div className={styles.service_description}>
												Код: {service.code}
											</div>
										</td>
										<td className={styles.table_cell_price}>
											{Number(service.price).toLocaleString()} ₽
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* ТЕРАПИЯ */}
				<div className={styles.section}>
					<h2 className={styles.section_title}>Терапия</h2>
					<div className={styles.table_wrapper}>
						<table className={styles.prices_table}>
							<thead>
								<tr className={styles.header_row}>
									<th className={styles.header_cell}>Наименование услуги</th>
									<th className={styles.header_cell_price}>Цена</th>
								</tr>
							</thead>
							<tbody>
								{prices.list2.serv.map((service, index) => (
									<tr key={`therapy-${index}`} className={styles.table_row}>
										<td className={styles.table_cell}>
											<div className={styles.service_name}>{service.title}</div>
											<div className={styles.service_description}>
												Код: {service.code}
											</div>
										</td>
										<td className={styles.table_cell_price}>
											{service.price.includes(',')
												? service.price.replace(',', ' / ')
												: Number(service.price).toLocaleString()}{' '}
											₽
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* ОРТОПЕДИЯ */}
				<div className={styles.section}>
					<h2 className={styles.section_title}>Ортопедия</h2>
					<div className={styles.table_wrapper}>
						{/* Общие услуги */}
						<h3 className={styles.subsection_title}>
							{prices.list3.common.title}
						</h3>
						<table className={styles.prices_table}>
							<thead>
								<tr className={styles.header_row}>
									<th className={styles.header_cell}>Наименование услуги</th>
									<th className={styles.header_cell_price}>Цена</th>
								</tr>
							</thead>
							<tbody>
								{prices.list3.common.serv.map((service, index) => (
									<tr
										key={`ortho-common-${index}`}
										className={styles.table_row}
									>
										<td className={styles.table_cell}>
											<div className={styles.service_name}>{service.title}</div>
											<div className={styles.service_description}>
												Код: {service.code}
											</div>
										</td>
										<td className={styles.table_cell_price}>
											{Number(service.price).toLocaleString()} ₽
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{/* Несъёмные протезы */}
						<h3 className={styles.subsection_title}>
							{prices.list3.fixed.title}
						</h3>
						<table className={styles.prices_table}>
							<thead>
								<tr className={styles.header_row}>
									<th className={styles.header_cell}>Наименование услуги</th>
									<th className={styles.header_cell_price}>Цена</th>
								</tr>
							</thead>
							<tbody>
								{prices.list3.fixed.serv.map((service, index) => (
									<tr key={`ortho-fixed-${index}`} className={styles.table_row}>
										<td className={styles.table_cell}>
											<div className={styles.service_name}>{service.title}</div>
											<div className={styles.service_description}>
												Код: {service.code}
											</div>
										</td>
										<td className={styles.table_cell_price}>
											{Number(service.price).toLocaleString()} ₽
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{/* Съёмные протезы */}
						<h3 className={styles.subsection_title}>
							{prices.list3.removable.title}
						</h3>
						<table className={styles.prices_table}>
							<thead>
								<tr className={styles.header_row}>
									<th className={styles.header_cell}>Наименование услуги</th>
									<th className={styles.header_cell_price}>Цена</th>
								</tr>
							</thead>
							<tbody>
								{prices.list3.removable.serv.map((service, index) => (
									<tr
										key={`ortho-removable-${index}`}
										className={styles.table_row}
									>
										<td className={styles.table_cell}>
											<div className={styles.service_name}>{service.title}</div>
											<div className={styles.service_description}>
												Код: {service.code}
											</div>
										</td>
										<td className={styles.table_cell_price}>
											{Number(service.price).toLocaleString()} ₽
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>

			<Contacts />
		</section>
	)
}

export default PricesPage
