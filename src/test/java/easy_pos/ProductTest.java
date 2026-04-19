package easy_pos;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import com.easypos.model.Product;

public class ProductTest {

    @Test
    public void testValidProduct() {
        Product p = new Product();
        p.setCodigoSku("ABC123");
        p.setNombreProducto("Laptop");
        p.setPrecioVenta(new BigDecimal("2000"));
        p.setPrecioCosto(new BigDecimal("1500"));
        p.setStockActual(10);
        p.setStockMin(2);
        p.setCategoriaId(1);

        assertTrue(p.isValid(), "El producto debería ser válido");
    }

    @Test
    public void testInvalidProductEmptySku() {
        Product p = new Product();
        p.setCodigoSku(""); // SKU vacío
        p.setNombreProducto("Laptop");
        p.setPrecioVenta(new BigDecimal("2000"));
        p.setPrecioCosto(new BigDecimal("1500"));
        p.setStockActual(10);
        p.setStockMin(2);
        p.setCategoriaId(1);

        assertFalse(p.isValid(), "El producto debería ser inválido por SKU vacío");
    }

    @Test
    public void testInvalidProductNegativePrice() {
        Product p = new Product();
        p.setCodigoSku("XYZ789");
        p.setNombreProducto("Mouse");
        p.setPrecioVenta(new BigDecimal("-100")); // precio negativo
        p.setPrecioCosto(new BigDecimal("50"));
        p.setStockActual(5);
        p.setStockMin(1);
        p.setCategoriaId(1);

        assertFalse(p.isValid(), "El producto debería ser inválido por precio negativo");
    }
}


