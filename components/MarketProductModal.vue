 <template>
    <b-modal body-bg-variant="light" header-bg-variant="light" size="xl" body-class="modal-style" scrollable centered id="product-modal" title="Add / Edit product" @ok="handleOk">
      <b-form  @submit.stop.prevent="handleSubmit">
        <b-card-group columns>

          <b-card>
            <h5 class="mb-3">Product info</h5>
            <b-form-group label="Name">
                <b-form-input v-model="productEdit.name" placeholder="Product name" required/>
            </b-form-group>
            <b-form-group label="Desciprion">
                <b-form-textarea
                    v-model="productEdit.description"
                    placeholder="Product description"
                    rows="3"
                    required
                    max-rows="6"
                ></b-form-textarea> 
             </b-form-group>
             <b-form-group label="Price">
                <b-form-input type="number" v-model="productEdit.price" placeholder="Product price" required/>
            </b-form-group>
            <b-form-group label="Category">
                <b-form-select v-model="productEdit.category" :options="categoryOptions" required>
                    <template #first>
                        <b-form-select-option :value="null" disabled>Select category</b-form-select-option>
                    </template>
                </b-form-select>
            </b-form-group>
          </b-card>

          <b-card>
            <h5 class="mb-3">Product photos</h5>
            <b-form-group class="m-0">
              <div class="d-flex mb-3">
                <b-form-file v-model="selectedImage" accept="image/jpeg, image/png" placeholder="Select or drag photo" class="w-auto flex-grow-1"><b-icon icon="search" /></b-form-file>
              </div>
                <div class="col-sm-4 mb-0 position-relative" v-for="(image, imageIndex) in productEdit.images" :key="imageIndex">
                    <b-button size="sm" v-if="hasImage" variant="danger" class="image-delete position-absolute" @click="handleImageDelete(imageIndex)"><b-icon icon="x" /></b-button>
                    <b-img class="image" thumbnail :src="image.fileB64"></b-img>
                </div>

                <!--<div v-if="!hasImage && productEdit.transportPhotoName" class="position-relative">
                    <b-img :src="$config.baseUrl + '/users/image/' + productEdit.transportPhotoName" fluid block rounded/>
                    <b-button variant="danger" class="m-3 position-absolute btn-close" @click="clearImage"><b-icon icon="x" /></b-button>
                </div>-->
            </b-form-group>
          </b-card>

        </b-card-group>
      </b-form>
    </b-modal>
</template>
<script>
const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export default {
  props: {},
  data() {
    return {
        productEdit: {
            category: null,
            images: []
        },
        selectedImage: null,
        show: true,
        categoryOptions: [
            { text: 'Equipment', value: 'EQUIPMENT' },
            { text: 'Transport', value: 'TRANSPORT' },
            { text: 'Spare parts', value: 'SPARE_PARTS' },
            { text: 'Accessories', value: 'ACCESSORIES' },
            { text: 'Other', value: 'OTHER' }
        ]
    }
  },
  computed: {
    hasImage() {
      return !!this.productEdit.images;
    }
  },
  created () {
    //this.getProduct()
    this.productEdit = {
        category: null,
        images: []
    }
  },
  watch: {
    $route () {
     //this.getProduct();
    },
    'selectedImage'(newValue, oldValue) {
        console.log(newValue)
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.productEdit.images.push({fileB64:value});
              this.selectedImage = null
            })
            .catch(() => {
              //this.imageSrc = null;
            });
        } else {
          //this.imageSrc = null;
        }
      }
    }
  },
  methods: {
    getProduct () {
      this.$axios.$get(`${this.$config.baseUrl}/marketProducts/${this.$route.params.id}`).then((response) => {
        this.product = response;
        console.log(response);
        //this.items = [{
         // title: this.user.transportModel,
         // src: this.$config.baseUrl + '/users/image/' + this.user.transportPhotoName
        //}]
      });
    },
    handleImageDelete(indx) {
      this.productEdit.images.splice(indx, 1)
    },
    onProductEdit () {
      this.productEdit = Object.assign({}, this.product)
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      const data = Object.assign({}, this.productEdit)
      //if (this.imageSrc) data.transportPhoto = this.imageSrc.split(',')[1]
      data.images.forEach(image => {
          image.fileB64 = image.fileB64.split(',')[1]
      });

      this.$axios.$post(`${this.$config.baseUrl}/marketProducts`, data).then(() => {
        this.$nextTick(() => {
          this.$bvModal.hide('product-modal')
        })
      });
    }
  }
}
</script>

<style scoped>
.upper>div {
    height: 320px;
    background-color: #1a2740;
    border-radius: 6px;
}
.profile {
    width: 15rem;
    bottom:-2rem;
}
.image-delete,
.btn-close {
  top:0; right:0;
}
@media (min-width: 576px) {
  .card-columns {
    column-count: 2;
  }
}
.transportImage {
    cursor: pointer;
}
</style>