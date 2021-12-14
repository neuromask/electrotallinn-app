<i18n lang="yaml">
  en:
    bot: "Bot"
    commands: "Commands"
    chat: "Chat"
    text-chat: "Open {0} app and start chat with {1}."
    text-commands: "Add points to the {0} and products to the {1}."
    text-map: "map"
    text-market: "market"
    sell: "Sell product on market"
    add: "Add point to map"
    map: "Map menu"
    market: "Market menu"
    weather: "Weather forecast"
    ali: "Aliexpress links"
    help: "List of bot commands"
    social: "Social media links"
    pic: "Search for image"
    title-market: "Market"
    title-map: "Map"
    title-profiles: "Profiles"
    desc-market: "Buy & Sell | Sell and buy stuff related to electric transport area."
    desc-map: "Charge & Repair Map | Map with the locations of outlets for charging, repair in accessible places."
    desc-profiles: "ElectroTallinn people | Profiles of ElectroPeople team. Let's know each other closer."
  ru:
    bot: "Бот"
    commands: "Команды"
    chat: "Чат"
    text-chat: "Запустите {0} приложение для общения с ботом {1}."
    text-commands: "Добавляйте точки на {0} и продукты в {1}."
    text-map: "карту"
    text-market: "маркет"
    sell: "Добавить продукт на продажу"
    add: "Добавить точку на карту"
    map: "Меню карты"
    market: "Меню маркета"
    weather: "Прогноз погоды"
    ali: "Aliexpress ссылки с полезностями"
    help: "Перечень команд для бота"
    social: "Ссылки на соц сети"
    pic: "Искать картинку"
    title-market: "Маркет"
    title-map: "Карта"
    title-profiles: "Профили"
    desc-market: "Купи & Продай | Покупай и продавай вещи связанные с электротранспортом."
    desc-map: "Карта Зарядки & Починки | Карта с месторасположением розеток и станций для ремонта."
    desc-profiles: "Люди ElectroTallinn | Профили команды ElectroPeople. Давайте ближе узнаем друг друга."
</i18n>
<template>
  <section>
    <b-row class="mt-3">
      <b-col cols="12" lg="4" class="p-3">
        <UserProfileBox />
        <b-card>
          <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">{{ $t('bot') }}</b-badge> {{ $t('chat') }}</h3>
          <i18n path="text-chat" tag="h5" class="my-3">
            <a href="https://telegram.org/" target="_blank"><strong>Telegram</strong></a>
            <a href="https://t.me/electrotallinnbot" target="_blank"><strong>ElectroBot</strong></a>
          </i18n>
          <a href="https://t.me/electrotallinnbot" target="_blank">
            <b-img class="card-img " rounded="circle" :src="require('@/assets/img/bot-avatar.svg')"></b-img>
          </a>
        </b-card>
      </b-col>
      <b-col cols="12" lg="8" class="p-3">
        <b-card>
          <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">{{ $t('bot') }}</b-badge> {{ $t('commands') }}</h3>
          <i18n path="text-commands" tag="h5" class="my-3">
            <NuxtLink :to="localePath('/map')"><strong>{{ $t('text-map') }}</strong></NuxtLink>
            <NuxtLink :to="localePath('/market')"><strong>{{ $t('text-market') }}</strong></NuxtLink>
          </i18n>
          <b-list-group>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/sell</strong></kbd> - {{ $t('sell') }}</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/add</strong></kbd> - {{ $t('add') }}</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/map</strong></kbd> - {{ $t('map') }}</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/market</strong></kbd> - {{ $t('market') }}</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/weather</strong></kbd> - {{ $t('weather') }}</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/ali</strong></kbd> - {{ $t('ali') }}</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/help</strong></kbd> - {{ $t('help') }}</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/social</strong></kbd> - {{ $t('social') }}</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/pic</strong></kbd> - {{ $t('pic') }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
        <b-col cols="12" lg="4" class="p-3">
            <b-card img-alt="Image" img-top class="p-3">
                <h3 class="font-weight-bold mb-4">
                    <b-badge variant="warning" class="text-white">ET⚡️</b-badge> {{ $t('title-market') }}
                    <b-icon class="info-icon-tip" id="marketInfo" variant="primary" icon="info-circle-fill"></b-icon>
                </h3>
                <b-popover ref="popover" target="marketInfo" triggers="hover" :title="$tc('desc-market', 1)">
                    {{ $tc('desc-market', 2) }}
                </b-popover>
                <NuxtLink :to="localePath('/market')"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-market.svg')"></b-card-img></NuxtLink>
            </b-card>
        </b-col>
        <b-col cols="12" lg="4" class="p-3">
            <b-card img-alt="Image" img-top class="p-3">
                <h3 class="font-weight-bold mb-4">
                    <b-badge variant="warning" class="text-white">ET⚡️</b-badge> {{ $t('title-map') }}
                    <b-icon class="info-icon-tip" id="mapInfo" variant="primary" icon="info-circle-fill"></b-icon>
                </h3>
                <b-popover ref="popover" target="mapInfo" triggers="hover" :title="$tc('desc-map', 1)">
                    {{ $tc('desc-map', 2) }}
                </b-popover>
                <NuxtLink :to="localePath('/map')"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-map.svg')"></b-card-img></NuxtLink>
            </b-card>
        </b-col>
        <b-col cols="12" lg="4" class="p-3">
            <b-card img-alt="Image" img-top class="p-3">
                <h3 class="font-weight-bold mb-4">
                    <b-badge variant="warning" class="text-white">ET⚡️</b-badge> {{ $t('title-profiles') }}
                    <b-icon class="info-icon-tip" id="usersInfo" variant="primary" icon="info-circle-fill"></b-icon>
                </h3>
                <b-popover ref="popover" target="usersInfo" triggers="hover" :title="$tc('desc-profiles', 1)">
                    {{ $tc('desc-profiles', 2) }}
                </b-popover>
                <NuxtLink :to="localePath('/users')"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-user.svg')"></b-card-img></NuxtLink>
            </b-card>
        </b-col>
    </b-row>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.card-body {
    position: relative;
}
.card-img {
  border-radius: 20%;
  border: 1rem solid #c0d1e6;;
}
.card-img:focus,
.card-img:hover {
  border-radius: 20%;
  border: 1rem solid #4482a9;
  transition: border-color 0.4s ease-out;
}
.info-icon-tip {
    float:right;
    width: 32px;
    height: 32px;
}
</style>
