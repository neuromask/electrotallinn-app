<template>
  <section>
    <b-row>
      <b-col cols="12" lg="4" class="mb-lg-0 mb-5">
        <h3 class="underline font-weight-bold">{{ $t('main.top') }} <span class="small">({{ listTop.length }})</span></h3>
        <b-table
          class="rounded shadow-sm mb-5"
          borderless
          striped
          table-variant="light"
          :items="listTop"
          :fields="fieldsTop"
          :sort-by.sync="sortRankBy"
          :sort-desc.sync="sortRankDesc"
        >
          <template #cell(indx)="data">
            <b-img :src="require(`~/assets/img/ranks/${ranks[getRank(data.item.count)].icon}.png`)" center fluid class="table-icon" />
          </template>
          <template #cell(userFirstName)="data">
            <div class="w-100">
              <h4>{{ data.item.userFirstName }}</h4>
              <i class="rank-sub">{{ ranks[getRank(data.item.count)].name }}</i>
            </div>
          </template>
          <template #cell(count)="data">
            <b-badge variant="dark" class="text-white font-weight-bold"><h4>{{ data.item.count }}</h4></b-badge>
          </template>
        </b-table>
        <h3 class="underline font-weight-bold">{{ $t('main.legend') }}</h3>
        <b-table
          class="rounded shadow-sm"
          borderless
          striped
          table-variant="light"
          :items="ranks"
          :fields="fieldsRank"
        >
          <template #cell(icon)="data">
            <b-img :src="require(`~/assets/img/ranks/${data.item.icon}.png`)" center fluid class="table-icon" />
          </template>
          <template #cell(name)="data">
            <h4>{{ data.item.name }}</h4>
          </template>
          <template #cell(minCount)="data">
            <b-badge variant="dark" class="text-white font-weight-bold"><h4>{{ data.item.minCount }}+</h4></b-badge>
          </template>
        </b-table>
      </b-col>
      <b-col cols="12" lg="8">
        <h3 class="underline font-weight-bold">{{ $t('nav.locations') }} <span class="small">({{ listFull.length }})</span></h3>
        <b-table
          class="rounded overflow-auto shadow-sm"
          borderless
          striped
          sticky-header="1760px"
          table-variant="light"
          :items="listFull"
          :fields="fieldsLoc"
          :sort-by.sync="sortLocBy"
          :sort-desc.sync="sortLocDesc"
        >
          <template #cell(title)="data">
            <h4>{{ data.item.title }}</h4><p>{{ data.item.description }}</p><small>{{ $t('main.addedBy') }}: {{ data.item.userFirstName }}</small>
          </template>
          <template #cell(type)="data">
            <b-img :src="$locationIcons[data.item.type]" center fluid-grow class="table-icon" />
          </template>
          <template #cell(imageName)="data">
            <b-button-group size="sm" vertical>
              <b-button v-b-modal="'image-modal-'+data.item.id">{{ $t('main.photo') }}</b-button>
              <b-button v-b-modal="'map-modal-'+data.item.id" variant="primary" size="sm">{{ $t('nav.map') }}</b-button>
            </b-button-group>
            <b-modal :id="'image-modal-'+data.item.id" :title="$t('main.photo') +' - '+ data.item.title" ok-only>
              <b-img :src="`${$config.apiUrl}/locations/image/${data.item.imageName}`" center fluid />
            </b-modal>
            <b-modal :id="'map-modal-'+data.item.id" :title="$t('main.pointOnMap') +' - '+ data.item.title" ok-only>
              <iframe width="100%" height="460px" frameBorder="0" :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'" />
            </b-modal>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </section>
</template>

<script>

export default {
  head() { return { title: this.$t("nav.ranks"), } },
  props: {},
  data: () => ({
    ranks: [
      {
        num: 0,
        icon: 'rank-1',
        name: 'ElectroIron',
        minCount: 1
      },
      {
        num: 1,
        icon: 'rank-2',
        name: 'ElectroBronze',
        minCount: 3
      },
      {
        num: 2,
        icon: 'rank-3',
        name: 'ElectroSilver',
        minCount: 5
      },
      {
        num: 3,
        icon: 'rank-4',
        name: 'ElectroGoldie',
        minCount: 10
      },
      {
        num: 4,
        icon: 'rank-5',
        name: 'ElectroDmnd',
        minCount: 20
      },
      {
        num: 5,
        icon: 'rank-6',
        name: 'ElectroMeteor',
        minCount: 35
      },
      {
        num: 6,
        icon: 'rank-7',
        name: 'ElectroSpace',
        minCount: 50
      },
      {
        num: 7,
        icon: 'rank-8',
        name: 'ElectroGod',
        minCount: 75
      },
      {
        num: 8,
        icon: 'rank-9',
        name: 'ElectroZeus',
        minCount: 100
      }
    ],
    listFull: [],
    listTop: [],
    sortLocBy: 'id',
    sortLocDesc: true,
    sortRankBy: 'count',
    sortRankDesc: true
  }),
  computed: {
    fieldsRank() {
      return [
        {
          key: 'icon',
          label: this.$t('main.medal'),
          thClass: 'text-white bg-secondary',
          tdClass: 'text-center bg-secondary'
        },
        {
          key: 'name',
          label: this.$t('main.rank'),
          tdClass: 'w-100'
        },
        {
          key: 'minCount',
          label: this.$t('main.points')
        }
      ]
    },
    fieldsLoc() {
      return [
        {
          key: 'type',
          sortable: true,
          label: this.$t('main.type')
        },
        {
          key: 'title',
          sortable: true,
          label: this.$t('main.name')
        },
        {
          key: 'imageName',
          sortable: false,
          label: this.$t('main.info')
        }
      ]
    },
    fieldsTop() {
      return [
        {
          key: 'indx',
          sortable: false,
          label: this.$t('main.rank'),
          thClass: 'text-white bg-secondary',
          tdClass: 'text-center bg-secondary'
        },
        {
          key: 'userFirstName',
          sortable: false,
          label: this.$t('profile.name'),
          tdClass: 'w-100'
        },
        {
          key: 'count',
          sortable: false,
          label: this.$t('main.points')
        }
      ]
    }
  },
  getters: {
  },
  async mounted () {
    this.listFull = await this.$axios.$get(this.$config.apiUrl + '/locations')
    this.listTop = await this.$axios.$get(this.$config.apiUrl + '/locations/top')
  },
  methods: {
    getRank (points) {
      let rank
      for (rank of this.ranks.slice().reverse()) {
        if (points >= rank.minCount) { return rank.num }
      }
      return 0 // default
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
