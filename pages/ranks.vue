
<template>
  <section>
    <b-container class="bg-light mt-4 p-5">
      <h2 class="m-0"><strong>ElectroPeople ranking</strong> - top activity</h2>
      <h5>Be the first!</h5>
      <hr>
      <b-row>
        <b-col cols="12" lg="4">
          <h3><b-badge variant="warning" class="text-white font-weight-bold">Top</b-badge> ElectroPeople</h3>
          <b-table
            class="bg-info"
            borderless
            outlined
            striped
            hover
            :items="listTop"
            :fields="fieldsTop"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
          >
            <template #cell(indx)="data">
              <div class="d-flex justify-content-center align-items-center">
                <b-badge variant="light"><h3 class="text-right font-weight-bold">{{ data.index + 1 }}</h3></b-badge>
                <b-img :src="ranks[getRank(data.item.count)].icon" center left fluid class="ml-3 table-icon" />
              </div>
            </template>
            <template #cell(userFirstName)="data">
              <h4>{{ data.item.userFirstName }}</h4><i class="rank-sub">{{ ranks[getRank(data.item.count)].name }}</i>
            </template>
            <template #cell(count)="data">
              <b-badge variant="dark" class="text-white font-weight-bold"><h4>{{ data.item.count }}</h4></b-badge>
            </template>
          </b-table>
          <h3 class="mt-5"><b-badge variant="warning" class="text-white font-weight-bold">Legend</b-badge> Ranks</h3>
          <b-table
            class="bg-info mb-5"
            borderless
            outlined
            striped
            hover
            :items="ranks"
            :fields="fieldsRank"
          >
            <template #cell(icon)="data">
              <b-img :src="data.item.icon" center fluid class="table-icon" />
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
          <h3><b-badge variant="warning" class="text-white font-weight-bold">List</b-badge> Locations</h3>
          <b-table
            class="bg-info"
            borderless
            striped
            hover
            :items="listFull"
            :fields="fieldsLoc"
          >
            <template #cell(title)="data">
              <h4>{{ data.item.title }}</h4><p>{{ data.item.description }}</p><small>Added by: {{ data.item.userFirstName }}</small>
            </template>
            <template #cell(type)="data">
              <b-img :src="locationIcons[data.item.type]" center fluid-grow class="table-icon" />
            </template>
            <template #cell(imageName)="data">
              <b-button-group size="sm" vertical>
                <b-button v-b-modal="'image-modal-'+data.item.id">Image</b-button>
                <b-button v-b-modal="'map-modal-'+data.item.id" variant="primary" size="sm">Map</b-button>
              </b-button-group>
              <b-modal :id="'image-modal-'+data.item.id" title="Photo" ok-only>
                <b-img :src="$config.baseUrl + '/images/' + data.item.imageName" center fluid />
              </b-modal>
              <b-modal :id="'map-modal-'+data.item.id" title="Point on map" ok-only>
                <iframe width="100%" height="460px" frameBorder="0" :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'" />
              </b-modal>
            </template>
          </b-table>
        </b-col>

      </b-row>

    </b-container>

  </section>
</template>

<script>

export default {
  props: {},
  data: () => ({

      bgImages: [
        require('@/assets/img/pattern-icons.png'),
        require('@/assets/img/top.jpg'),
        require('@/assets/img/tallinn.svg')
      ],
      locationIcons: {
        CHARGE: require('@/assets/img/icon/icon-charge.svg'),
        REPAIR: require('@/assets/img/icon/icon-repair.svg'),
        AIR: require('@/assets/img/icon/icon-air.svg'),
        WATER: require('@/assets/img/icon/icon-water.svg')
      },
      ranks: [
        {
          num: 0,
          icon: require('@/assets/img/ranks/rank-1.png'),
          name: 'ElectroIron',
          minCount: 1
        },
        {
          num: 1,
          icon: require('@/assets/img/ranks/rank-2.png'),
          name: 'ElectroBronze',
          minCount: 3
        },
        {
          num: 2,
          icon: require('@/assets/img/ranks/rank-3.png'),
          name: 'ElectroSilver',
          minCount: 5
        },
        {
          num: 3,
          icon: require('@/assets/img/ranks/rank-4.png'),
          name: 'ElectroGoldie',
          minCount: 10
        },
        {
          num: 4,
          icon: require('@/assets/img/ranks/rank-5.png'),
          name: 'ElectroDmnd',
          minCount: 20
        },
        {
          num: 5,
          icon: require('@/assets/img/ranks/rank-6.png'),
          name: 'ElectroMeteor',
          minCount: 35
        },
        {
          num: 6,
          icon: require('@/assets/img/ranks/rank-7.png'),
          name: 'ElectroSpace',
          minCount: 50
        },
        {
          num: 7,
          icon: require('@/assets/img/ranks/rank-8.png'),
          name: 'ElectroGodness',
          minCount: 75
        },
        {
          num: 8,
          icon: require('@/assets/img/ranks/rank-9.png'),
          name: 'ElectroZeus',
          minCount: 100
        }
      ],
      listFull: [],
      listTop: [],
      fieldsLoc: [
        {
          key: 'type',
          sortable: true,
          label: 'Type'
        },
        {
          key: 'title',
          sortable: true,
          label: 'Name'
        },
        {
          key: 'imageName',
          sortable: false,
          label: 'Info'
        }
      ],
      fieldsTop: [
        {
          key: 'indx',
          sortable: false,
          label: 'Rank'
        },

        {
          key: 'userFirstName',
          sortable: false,
          label: 'Name'
        },
        {
          key: 'count',
          sortable: false,
          label: 'Pts'
        }
      ],
      sortBy: 'count',
      sortDesc: true,
      fieldsRank: [
        {
          key: 'icon',
          label: 'Medal'
        },
        {
          key: 'name',
          label: 'Rank'
        },
        {
          key: 'minCount',
          label: 'Pts'
        }
      ]

  }),
  computed: {
  },
  getters: {
  },
  async mounted () {
    this.listFull = await this.$axios.$get(process.env.baseUrl + '/locations')
    this.listTop = await this.$axios.$get(process.env.baseUrl + '/locations/top')
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
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
