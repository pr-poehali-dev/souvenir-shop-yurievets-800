import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import Cart from '@/components/Cart';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const products: Product[] = [
    { id: 1, name: 'Матрёшка "Юрьевецкая"', price: 1200, image: 'https://cdn.poehali.dev/projects/7149dbc1-77c7-4599-b055-b1ff708af2b5/files/e62cf0fc-0f52-498f-a97d-ba3bc54c4282.jpg' },
    { id: 2, name: 'Керамическая кружка с видами города', price: 800, image: 'https://cdn.poehali.dev/projects/7149dbc1-77c7-4599-b055-b1ff708af2b5/files/e62cf0fc-0f52-498f-a97d-ba3bc54c4282.jpg' },
    { id: 3, name: 'Магнит "Храм 800 лет"', price: 250, image: 'https://cdn.poehali.dev/projects/7149dbc1-77c7-4599-b055-b1ff708af2b5/files/e62cf0fc-0f52-498f-a97d-ba3bc54c4282.jpg' },
    { id: 4, name: 'Набор открыток "История"', price: 450, image: 'https://cdn.poehali.dev/projects/7149dbc1-77c7-4599-b055-b1ff708af2b5/files/e62cf0fc-0f52-498f-a97d-ba3bc54c4282.jpg' },
    { id: 5, name: 'Деревянная шкатулка', price: 2500, image: 'https://cdn.poehali.dev/projects/7149dbc1-77c7-4599-b055-b1ff708af2b5/files/e62cf0fc-0f52-498f-a97d-ba3bc54c4282.jpg' },
    { id: 6, name: 'Льняная салфетка с вышивкой', price: 600, image: 'https://cdn.poehali.dev/projects/7149dbc1-77c7-4599-b055-b1ff708af2b5/files/e62cf0fc-0f52-498f-a97d-ba3bc54c4282.jpg' },
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({
      title: "Добавлено в корзину",
      description: product.name,
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Корзина очищена",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Gift" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">Юрьевец 800</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex gap-6">
                <button onClick={() => scrollToSection('home')} className={`transition-colors ${activeSection === 'home' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>Главная</button>
                <button onClick={() => scrollToSection('catalog')} className={`transition-colors ${activeSection === 'catalog' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>Каталог</button>
                <button onClick={() => scrollToSection('about')} className={`transition-colors ${activeSection === 'about' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>О лавке</button>
                <button onClick={() => scrollToSection('history')} className={`transition-colors ${activeSection === 'history' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>История</button>
                <button onClick={() => scrollToSection('delivery')} className={`transition-colors ${activeSection === 'delivery' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>Доставка</button>
                <button onClick={() => scrollToSection('contacts')} className={`transition-colors ${activeSection === 'contacts' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>Контакты</button>
              </div>
              <Cart 
                items={cartItems}
                onRemoveItem={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onClearCart={clearCart}
              />
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Юрьевец 800</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Добро пожаловать в нашу лавку сувениров, посвящённую 800-летию Кржевца. 
                Здесь вы найдёте уникальные предметы, отражающие богатую историю и культуру нашего города.
              </p>
              <Button onClick={() => scrollToSection('catalog')} size="lg" className="gap-2">
                Посмотреть каталог
                <Icon name="ArrowRight" size={18} />
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/7149dbc1-77c7-4599-b055-b1ff708af2b5/files/db1e97e4-46df-4dd1-a02b-26e6a1e3947f.jpg" 
                alt="Юрьевец" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Каталог сувениров</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}₽</span>
                    <Button size="sm" variant="outline" onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-primary mb-8 text-center">О лавке</h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-lg leading-relaxed mb-6">
              Наша сувенирная лавка была создана специально к празднованию 800-летия города Юрьевца. 
              Мы тщательно отбираем каждый предмет, следя за тем, чтобы он отражал уникальную 
              историю и культурное наследие нашего города.
            </p>
            <p className="text-lg leading-relaxed">
              Все изделия созданы местными мастерами и ремесленниками, используя традиционные 
              техники и материалы. Покупая у нас, вы поддерживаете местных художников и сохраняете 
              культурные традиции.
            </p>
          </div>
        </div>
      </section>

      <section id="history" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">История Юрьевца</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/projects/7149dbc1-77c7-4599-b055-b1ff708af2b5/files/1bc43422-3dd1-4baa-91fe-c9ca0f4ab6b2.jpg" 
                alt="История Юрьевца" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Calendar" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">1225 год</h3>
                    <p className="text-muted-foreground">Основание города князем Юрием Всеволодовичем на берегу Волги</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Church" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Духовное наследие</h3>
                    <p className="text-muted-foreground">Город известен своими храмами и монастырями, сохранившимися до наших дней</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Культурное богатство</h3>
                    <p className="text-muted-foreground">800 лет традиций ремесленничества, торговли и культуры</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Доставка</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Store" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Самовывоз</h3>
              <p className="text-sm text-muted-foreground">Бесплатно из нашей лавки в центре города</p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">По России</h3>
              <p className="text-sm text-muted-foreground">Почтой России от 300₽, 5-14 дней</p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Package" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Курьер</h3>
              <p className="text-sm text-muted-foreground">По Юрьевцу 200₽, 1-2 дня</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Icon name="MapPin" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Адрес</h3>
                  <p className="text-muted-foreground">г. Юрьевец, ул. Советская, д. 15</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="Phone" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (900) 123-45-67</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="Mail" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@yurevets800.ru</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="Clock" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">Пн-Пт: 10:00 - 19:00<br/>Сб-Вс: 11:00 - 17:00</p>
                </div>
              </div>
            </div>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Напишите нам</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea 
                  placeholder="Сообщение" 
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" className="w-full">Отправить</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Gift" size={24} />
            <span className="font-bold text-xl">Юрьевец 800</span>
          </div>
          <Separator className="my-4 bg-primary-foreground/20" />
          <p className="text-sm opacity-80">© 2025 Сувенирная лавка "Юрьевец 800". Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;