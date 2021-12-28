<template>
  <section>
    <h3 class="mb-0 font-weight-bold">{{ $t('nav.locations') }} ({{ listFull.length }})</h3>
    <hr>
    <b-table
      class="rounded m-0"
      striped
      table-variant="light"
      :items="listFull"
      :fields="fieldsLoc"
    >
      <template #cell(title)="data">
        <h4>{{ data.item.title }}</h4><p class="small">{{ data.item.description }}</p>
      </template>
      <template #cell(type)="data">
        <b-img :src="require(`~/assets/img/icon/${locationIcons[data.item.type]}.svg`)" center fluid-grow class="table-icon" />
      </template>
      <template #cell(imageName)="data">
        <b-button-group size="sm" vertical>
          <b-button v-b-modal="'image-modal-'+data.item.id">{{ $t('main.photo') }}</b-button>
          <b-button v-b-modal="'map-modal-'+data.item.id" variant="primary" size="sm">{{ $t('nav.map') }}</b-button>
        </b-button-group>
        <b-modal :id="'image-modal-'+data.item.id" :title="$t('main.photo') +' - '+ data.item.title" ok-only>
          <b-img :src="$config.apiUrl + '/locations/image/' + data.item.imageName" center fluid />
        </b-modal>
        <b-modal :id="'map-modal-'+data.item.id" :title="$t('main.pointOnMap') +' - '+ data.item.title" ok-only>
          <iframe width="100%" height="460px" frameBorder="0" :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'" />
        </b-modal>
      </template>
    </b-table>
  </section>
</template>

<script>

export default {

  data() {
    return {
      locationIcons: {
        CHARGE: 'icon-charge',
        REPAIR: 'icon-repair',
        AIR: 'icon-air',
        WATER: 'icon-water'
      },
      listFull: []
    }
  },
  computed: {
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
          label: this.$t('main.name'),
          tdClass: 'w-100'
        },
        {
          key: 'imageName',
          sortable: false,
          label: this.$t('main.info')
        }
      ]
    }
  },
  mounted () {
    this.getLocList()
  },
  watch: {
    $route () {
     this.getLocList();
    }
  },
  methods: {
    getLocList() {
      this.$axios.$get(`${this.$config.apiUrl}/users/${this.$route.params.id}/locations`).then((response) => {
        this.listFull = response;
      });
    }
  }
}
</script>
