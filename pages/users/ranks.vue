<template>
  <section>
    <b-row>
      <b-col cols="12" lg="4">
        <h3 class="font-weight-bold mb-0"><b-badge variant="warning" class="text-white font-weight-bold">ElectroPeople</b-badge> {{ $t('main.top') }}</h3>
        <hr>
        <b-table
          class="bg-info rounded"
          borderless
          outlined
          striped
          :items="listTop"
          :fields="fieldsTop"
          :sort-by.sync="sortRankBy"
          :sort-desc.sync="sortRankDesc"
        >
          <template #cell(indx)="data">
            <div class="d-flex justify-content-center align-items-center">
              <b-badge variant="light"><h3 class="text-right font-weight-bold">{{ data.index + 1 }}</h3></b-badge>
              <b-img :src="require(`~/assets/img/ranks/${ranks[getRank(data.item.count)].icon}.png`)" center left fluid class="ml-3 table-icon" />
            </div>
          </template>
          <template #cell(userFirstName)="data">
            <h4>{{ data.item.userFirstName }}</h4><i class="rank-sub">{{ ranks[getRank(data.item.count)].name }}</i>
          </template>
          <template #cell(count)="data">
            <b-badge variant="dark" class="text-white font-weight-bold"><h4>{{ data.item.count }}</h4></b-badge>
          </template>
        </b-table>
        <h3 class="mt-5 font-weight-bold mb-0"><b-badge variant="warning" class="text-white font-weight-bold">{{ $t('nav.ranks') }}</b-badge> {{ $t('main.legend') }}</h3>
        <hr>
        <b-table
          class="bg-info mb-5 rounded"
          borderless
          outlined
          striped
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
        <h3 class="font-weight-bold mb-0"><b-badge variant="warning" class="text-white font-weight-bold">{{ $t('nav.locations') }}</b-badge> {{ $t('main.all') }}</h3>
        <hr>
        <b-table
          class="bg-info rounded"
          borderless
          striped
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
        name: 'ElectroGodness',
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
          label: this.$t('main.medal')
        },
        {
          key: 'name',
          label: this.$t('main.rank')
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
          label: this.$t('main.rank')
        },
        {
          key: 'userFirstName',
          sortable: false,
          label: this.$t('profile.name')
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
