# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Review.destroy_all
    Product.destroy_all
    User.destroy_all

  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('products')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      email: 'kaladin@stormblessed.io', 
      password: 'sylphrena'
    )

  
    # More users
    10.times do 
      User.create!({
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating products..."

    # pint_glass = Product.create!(
    #   name: 'pint glass',
    #   description: 'This is a glass that is exactly one pint in size.',
    #   price: 25
    # )

    # 23.times do
    #   Product.create!(
    #     {name: Faker::Commerce.product_name,
    #     description: Faker::Lorem.sentence,
    #     price: Faker::Commerce.price(range: 7..350)}
    #   )

    # end

    products_data = [
    { name: "LuminaSync Smart Lamp", description: "Illuminate your life with LuminaSync, the intelligent lamp that adapts to your mood. With customizable color options, built-in music synchronization, and smart home integration, LuminaSync transforms any room into a dynamic and harmonious space. Set the ambiance for relaxation or productivity effortlessly, all controlled through a user-friendly mobile app. Its sleek design and energy-efficient LED technology make LuminaSync a stylish and eco-friendly addition to your home or office." },

    { name: "ZenGlow Aromatherapy Diffuser", description: "Create a serene atmosphere with ZenGlow, the ultimate aromatherapy diffuser. This elegant device releases fragrant mist while adding a calming LED glow to your surroundings. Choose from a variety of essential oils to personalize your experience, promoting relaxation and well-being. With its whisper-quiet operation and automatic shut-off feature, ZenGlow ensures a peaceful and worry-free environment. Enhance your self-care routine and bring tranquility into your life with this stylish and functional diffuser." },

    { name: "QuantumFit Smart Fitness Mat", description: "Elevate your workouts with QuantumFit, the world's first smart fitness mat. This innovative mat integrates with your favorite fitness apps, providing real-time feedback on your posture, balance, and progress. With built-in sensors and Bluetooth connectivity, QuantumFit turns any space into a personalized workout studio. Its durable, non-slip surface ensures a safe and effective exercise session every time. Take your fitness journey to the next level with this cutting-edge, interactive fitness mat." },

    { name: "MystiBlend Herbal Infuser", description: "Introducing MystiBlend, the herbal infuser that turns ordinary drinks into extraordinary concoctions. With a built-in chamber for fresh herbs and fruits, MystiBlend effortlessly adds natural flavors to your beverages. From refreshing mint lemonades to soothing chamomile teas, explore endless possibilities with this versatile infuser. The easy-to-use design and quick cleaning make MystiBlend a must-have for those who appreciate a healthy and flavorful drink experience." },

    { name: "VitaView Virtual Reality Glasses", description: "Immerse yourself in a world of possibilities with VitaView, the virtual reality glasses that redefine entertainment. Whether you're gaming, watching movies, or exploring virtual landscapes, VitaView provides a stunning 3D experience with its high-resolution display and immersive audio. The ergonomic design ensures comfort during extended use, and the adjustable head strap accommodates all head sizes. Step into a new dimension of entertainment with VitaView – where reality meets the extraordinary." },

    { name: "EcoHarvest Sustainable Backpack", description: "Make a statement with EcoHarvest, the eco-friendly backpack that combines style and sustainability. Crafted from recycled materials and featuring a minimalist design, EcoHarvest is the perfect accessory for the environmentally conscious individual. Its spacious compartments, laptop sleeve, and water-resistant exterior make it ideal for both work and play. The adjustable shoulder straps provide comfort, while the sleek silhouette adds a touch of modernity to your daily adventures." },

    { name: "AquaPure Smart Water Bottle", description: "Stay hydrated intelligently with AquaPure, the smart water bottle that tracks your water intake and reminds you to stay hydrated throughout the day. Equipped with a hydration sensor and Bluetooth connectivity, AquaPure syncs with your smartphone to provide real-time hydration data and personalized reminders. The sleek and durable design makes it suitable for any lifestyle, from fitness enthusiasts to office professionals. Embrace a healthier lifestyle with AquaPure – where hydration meets innovation." },

    { name: "EcoChic Reusable Shopping Bags", description: "Go green with EcoChic, the reusable shopping bags that combine style and sustainability. Made from durable, eco-friendly materials, these bags are the perfect alternative to single-use plastic. The stylish patterns and compact foldable design make EcoChic a fashionable and practical choice for grocery shopping and daily errands. Join the eco-conscious movement and make a positive impact on the planet with these reusable and chic shopping bags." },

    { name: "GloWave UV-C Sanitizer Wand", description: "Keep your surroundings germ-free with GloWave, the portable UV-C sanitizer wand. This compact device uses ultraviolet light to eliminate bacteria and viruses from surfaces, providing a quick and effective way to sanitize your belongings. The sleek and ergonomic design allows for easy handling, and the rechargeable battery ensures long-lasting use. From doorknobs to electronic devices, GloWave offers peace of mind by reducing the risk of exposure to harmful pathogens." },

    { name: "RevitalizeRx Sleep Aid Pillow", description: "Experience the ultimate relaxation with RevitalizeRx, the sleep aid pillow designed for a rejuvenating night's sleep. Filled with premium memory foam and infused with calming lavender scents, this pillow promotes relaxation and stress relief. The ergonomic design supports proper spinal alignment, reducing neck and shoulder discomfort. The hypoallergenic cover is easy to remove and machine washable, ensuring a clean and comfortable sleeping environment. Transform your bedtime routine with RevitalizeRx – where comfort meets tranquility." },

    { name: "PulseBeat Heart Rate Monitor Watch", description: "Take control of your fitness journey with PulseBeat, the heart rate monitor watch that empowers your workouts. With continuous heart rate tracking, activity monitoring, and a built-in GPS, PulseBeat provides comprehensive insights into your fitness level. The sleek and water-resistant design makes it suitable for any exercise, from running to swimming. Stay connected with smart notifications and customize your workout experience with PulseBeat – where performance meets precision." },

    { name: "SolarScape Portable Solar Charger", description: "Harness the power of the sun with SolarScape, the portable solar charger for all your devices. This compact and lightweight charger features high-efficiency solar panels, providing a sustainable and eco-friendly way to charge your gadgets on the go. The built-in USB ports and compatibility with various devices make SolarScape a versatile solution for outdoor adventures or emergencies. Stay connected and reduce your carbon footprint with this innovative solar charging solution." },

    { name: "EverFresh Refrigerator Air Purifier", description: "Keep your refrigerator odor-free with EverFresh, the refrigerator air purifier that neutralizes unwanted smells and extends the freshness of your food. Using advanced air purification technology, EverFresh eliminates bacteria and ethylene gas, preventing premature food spoilage. The compact and battery-operated design makes it easy to place in any refrigerator or storage space. Enjoy crisp and flavorful produce for longer with EverFresh – where freshness meets innovation." },

    { name: "NovaTech Noise-Canceling Earplugs", description: "Block out the noise and find your focus with NovaTech, the noise-canceling earplugs designed for a quiet and peaceful environment. Whether you're working, studying, or seeking relaxation, NovaTech uses advanced noise-canceling technology to minimize ambient sounds. The comfortable and ergonomic design ensures a secure fit, and the rechargeable battery provides hours of uninterrupted use. Discover a new level of concentration with NovaTech – where silence enhances productivity." },

    { name: "PureBrew Cold Brew Coffee Maker", description: "Indulge in the rich flavors of cold brew coffee with PureBrew, the cold brew coffee maker that delivers a smooth and bold taste. With a durable glass carafe and stainless steel filter, PureBrew is the perfect addition to any coffee lover's kitchen. The easy-to-use design allows you to create your favorite cold brew concentrate at home, saving you time and money. Elevate your coffee experience with PureBrew – where simplicity meets perfection." },

    { name: "AuraGlide Electric Toothbrush", description: "Achieve a brighter smile with AuraGlide, the electric toothbrush that combines advanced technology with dental care expertise. With multiple brushing modes, a built-in timer, and pressure sensors, AuraGlide ensures a thorough and gentle cleaning experience. The sleek and waterproof design makes it convenient for everyday use, and the long-lasting battery ensures uninterrupted oral care. Prioritize your dental health with AuraGlide – where innovation meets your smile." },

    { name: "UrbanGroove Smart Plant Pot", description: "Bring nature into your urban space with UrbanGroove, the smart plant pot that makes caring for plants easy and enjoyable. Equipped with sensors that monitor soil moisture, light exposure, and temperature, UrbanGroove sends real-time notifications and care tips to your smartphone. The modern and minimalist design complements any decor, turning your home or office into a green oasis. Foster a connection with nature effortlessly with UrbanGroove – where technology meets botanical beauty." },

    { name: "HydroHaven Hydroponic Herb Garden", description: "Cultivate fresh herbs year-round with HydroHaven, the hydroponic herb garden that requires no soil and minimal effort. Using water and nutrient-rich solutions, HydroHaven provides the perfect environment for herbs to thrive. The compact and customizable design fits seamlessly into any kitchen or living space, allowing you to harvest flavorful herbs for your culinary creations. Elevate your cooking with HydroHaven – where simplicity meets gourmet." },

    { name: "SkyScape Star Projector", description: "Transform your room into a mesmerizing night sky with SkyScape, the star projector that brings the beauty of the cosmos indoors. With adjustable brightness and a variety of projection modes, SkyScape creates a calming and enchanting atmosphere for relaxation or bedtime. The compact and user-friendly design allows you to customize your cosmic experience, making it a perfect addition to any bedroom or meditation space. Immerse yourself in the wonders of the universe with SkyScape – where dreams meet reality." },

    { name: "SwiftCharge Wireless Charging Pad", description: "Simplify your charging experience with SwiftCharge, the wireless charging pad that powers up your devices effortlessly. Compatible with Qi-enabled devices, SwiftCharge eliminates the need for tangled cables and provides a sleek and clutter-free charging solution. The non-slip surface ensures your devices stay in place, and the LED indicator light indicates the charging status. Streamline your charging routine with SwiftCharge – where convenience meets innovation." },

    { name: "PolarPod Insulated Water Bottle", description: "Keep your beverages at the perfect temperature with PolarPod, the insulated water bottle that preserves the coldness or warmth of your drinks for hours. With double-wall vacuum insulation and a durable stainless steel construction, PolarPod is the ideal companion for staying hydrated on the go. The leak-proof lid and ergonomic design make it easy to use and carry, whether you're commuting or exploring the outdoors. Embrace refreshment without compromise with PolarPod – where insulation meets style." },

    { name: "TechTune Bluetooth Sleep Mask", description: "Immerse yourself in relaxation with TechTune, the Bluetooth sleep mask that combines comfort with wireless audio. The plush mask features built-in speakers, allowing you to enjoy your favorite music or soothing sounds while blocking out light for a restful sleep. The adjustable strap ensures a secure fit, and the rechargeable battery provides hours of uninterrupted music or white noise. Enhance your sleep environment with TechTune – where comfort meets audio bliss." },

    { name: "ReflectRhythm Smart Mirror", description: "Elevate your fitness routine with ReflectRhythm, the smart mirror that transforms into a personalized workout experience. With its full-length mirror and integrated display, ReflectRhythm guides you through interactive workouts, tracks your progress, and provides real-time feedback. The sleek and space-saving design makes it a stylish addition to any home gym or living space. Embrace a new era of fitness with ReflectRhythm – where reflection meets motivation." },

    { name: "GloBeam Color-Changing Light Bulb", description: "Set the mood with GloBeam, the color-changing light bulb that adds a vibrant ambiance to any room. With customizable color options and remote control functionality, GloBeam allows you to create the perfect lighting for any occasion. The energy-efficient LED technology and long lifespan make it a sustainable and cost-effective lighting solution. From cozy evenings to lively gatherings, GloBeam enhances your living spaces with a burst of color – where illumination meets creativity." }
  ]

  products_data.each do |product|
    Product.create!(product.merge(price: Faker::Commerce.price(range: 7.00..350.00)))
  end




  Product.all.each do |product|
    pic = URI.open("https://picsum.photos/256")
    product.photos.attach(io: pic, filename: "product#{product.id}_thumbnail.jpg")
  end

  puts "creating reviews..."

  215.times do |i|
    Review.create!(
      body: Faker::Lorem.paragraph(sentence_count: 8),
      rating: rand(1..5),
      product_id: (i + 1) % 24 + 1,
      user_id: rand(2..11)
    )
  end

  puts "Done!"
  # end
